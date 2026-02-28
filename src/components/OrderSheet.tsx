import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { formatPrice } from "@/lib/formatPrice";
import { Link } from "react-router-dom";
import { Pencil, User, Phone, MapPin } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const orderSchema = z.object({
  customer_name: z.string().trim().min(2, "Ime i prezime je obavezno").max(100),
  customer_phone: z
    .string()
    .trim()
    .min(6, "Unesite validan broj telefona")
    .max(30)
    .regex(/^[+\d\s\-()]+$/, "Neispravan format broja telefona"),
  customer_address: z.string().trim().min(5, "Adresa je obavezna").max(300),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  part: {
    id: number;
    dio: string;
    marka: string;
    tip: string;
    model: string;
    cijena?: number | null;
  };
}

const SHIPPING_PRICE = 10;

const OrderSheet = ({ open, onOpenChange, part }: OrderSheetProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { user, profile } = useAuth();

  const isProfileComplete = !!(
    profile?.full_name &&
    profile?.phone &&
    profile?.address
  );

  const showSummary = !!user && isProfileComplete && !editMode;

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customer_name: "",
      customer_phone: "",
      customer_address: "",
    },
  });

  // Auto-fill from profile when sheet opens or editMode activates
  useEffect(() => {
    if (open && profile) {
      if (profile.full_name) form.setValue("customer_name", profile.full_name);
      if (profile.phone) form.setValue("customer_phone", profile.phone);
      if (profile.address) form.setValue("customer_address", profile.address);
    }
  }, [open, profile, editMode]);

  // Reset editMode when sheet closes
  useEffect(() => {
    if (!open) setEditMode(false);
  }, [open]);

  const hasPrice = part.cijena != null && part.cijena > 0;
  const partPrice = hasPrice ? Number(part.cijena) : null;
  const totalPrice = partPrice != null ? partPrice + SHIPPING_PRICE : null;

  const handleSubmitOrder = async (values: OrderFormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("orders").insert({
        part_id: part.id,
        part_name: `${part.dio} – ${part.marka} ${part.tip}`,
        customer_name: values.customer_name,
        customer_phone: values.customer_phone,
        customer_address: values.customer_address,
        part_price: partPrice,
        shipping_price: SHIPPING_PRICE,
        total_price: totalPrice,
        ...(user ? { user_id: user.id } : {}),
      });

      if (error) throw error;

      toast.success("Narudžba uspješno poslana!");
      form.reset();
      onOpenChange(false);
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Greška pri slanju narudžbe. Pokušajte ponovo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickOrder = async () => {
    if (!profile) return;
    await handleSubmitOrder({
      customer_name: profile.full_name,
      customer_phone: profile.phone,
      customer_address: profile.address,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Naručite artikal</SheetTitle>
          <SheetDescription>
            {showSummary
              ? "Provjerite podatke i potvrdite narudžbu."
              : "Unesite podatke za dostavu i potvrdite narudžbu."}
          </SheetDescription>
        </SheetHeader>

        {/* Guest prompt */}
        {!user && (
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-center text-sm">
            <span className="text-muted-foreground">Imate račun? </span>
            <Link to="/prijava" className="text-primary font-medium hover:underline">
              Prijavite se
            </Link>
            <span className="text-muted-foreground"> ili </span>
            <Link to="/prijava" className="text-primary font-medium hover:underline">
              napravite račun
            </Link>
            <span className="text-muted-foreground"> za brže naručivanje.</span>
          </div>
        )}

        {/* Logged in but incomplete profile */}
        {user && !isProfileComplete && (
          <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-center text-sm text-muted-foreground">
            Popunite podatke koji nedostaju za dostavu.
          </div>
        )}

        {/* Summary view for complete profile */}
        {showSummary ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Podaci za dostavu</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setEditMode(true)}
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Uredi
                </Button>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{profile!.full_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{profile!.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{profile!.address}</span>
                </div>
              </div>
            </div>

            <OrderSummary part={part} partPrice={partPrice} totalPrice={totalPrice} />

            <Button className="w-full" disabled={submitting} onClick={handleQuickOrder}>
              {submitting ? "Šaljem..." : "Potvrdi narudžbu"}
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitOrder)} className="space-y-4 mt-6">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ime i prezime</FormLabel>
                    <FormControl>
                      <Input placeholder="Ime Prezime" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customer_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Broj telefona</FormLabel>
                    <FormControl>
                      <Input placeholder="+387 6x xxx xxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customer_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresa za dostavu</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ulica, broj, grad, poštanski broj" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="my-4" />

              <OrderSummary part={part} partPrice={partPrice} totalPrice={totalPrice} />

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Šaljem..." : "Potvrdi narudžbu"}
              </Button>
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
};

/* Extracted order summary to avoid duplication */
function OrderSummary({
  part,
  partPrice,
  totalPrice,
}: {
  part: { dio: string; marka: string; tip: string; model: string };
  partPrice: number | null;
  totalPrice: number | null;
}) {
  return (
    <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Artikal</span>
        <span className="font-medium text-foreground text-right max-w-[60%] truncate">
          {part.dio}
        </span>
      </div>
      <div className="flex justify-between text-muted-foreground text-xs">
        <span>{part.marka} {part.tip} {part.model || ""}</span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between">
        <span className="text-muted-foreground">Cijena dijela</span>
        <span className="font-medium text-foreground">
          {partPrice != null ? formatPrice(partPrice) : "Po dogovoru"}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Dostava</span>
        <span className="font-medium text-foreground">{formatPrice(SHIPPING_PRICE)}</span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between font-bold text-base">
        <span>UKUPNO</span>
        <span>
          {totalPrice != null ? formatPrice(totalPrice) : "Po dogovoru"}
        </span>
      </div>
    </div>
  );
}

export default OrderSheet;
