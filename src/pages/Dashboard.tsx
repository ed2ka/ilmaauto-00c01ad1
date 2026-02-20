import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMyOrders } from "@/hooks/useOrders";
import { useWishlist } from "@/hooks/useWishlist";
import { supabase } from "@/integrations/supabase/client";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Trash2, Package, Heart, UserIcon } from "lucide-react";
import { useToggleWishlist } from "@/hooks/useWishlist";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  nova: { label: "Nova", variant: "default" },
  "u obradi": { label: "U obradi", variant: "secondary" },
  poslano: { label: "Poslano", variant: "outline" },
  zavrseno: { label: "Završeno", variant: "secondary" },
};

const Dashboard = () => {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const { data: orders, isLoading: ordersLoading } = useMyOrders();
  const { data: wishlistItems, isLoading: wishLoading } = useWishlist();
  const toggleWishlist = useToggleWishlist();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileInit, setProfileInit] = useState(false);
  const [saving, setSaving] = useState(false);

  // Init form with profile data
  if (profile && !profileInit) {
    setFullName(profile.full_name || "");
    setPhone(profile.phone || "");
    setAddress(profile.address || "");
    setProfileInit(true);
  }

  if (loading) return null;
  if (!user) return <Navigate to="/prijava" replace />;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone, address })
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Greška pri spremanju profila.");
    } else {
      toast.success("Profil uspješno ažuriran!");
      await refreshProfile();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pt-[100px] lg:pt-[108px]">
      <TopBar />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Moj profil</h1>
          <Button variant="ghost" size="sm" onClick={signOut}>Odjavi se</Button>
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders" className="gap-1.5">
              <Package className="w-4 h-4" /> Narudžbe
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="gap-1.5">
              <Heart className="w-4 h-4" /> Želje
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-1.5">
              <UserIcon className="w-4 h-4" /> Profil
            </TabsTrigger>
          </TabsList>

          {/* Orders */}
          <TabsContent value="orders">
            <Card>
              <CardHeader><CardTitle>Moje narudžbe</CardTitle></CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <p className="text-muted-foreground text-sm">Učitavanje...</p>
                ) : !orders?.length ? (
                  <p className="text-muted-foreground text-sm">Nemate nijednu narudžbu.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.map((o) => {
                      const s = statusMap[o.status] || { label: o.status, variant: "outline" as const };
                      return (
                        <div key={o.id} className="border rounded-lg p-4 space-y-1">
                          <div className="flex items-start justify-between">
                            <p className="font-medium text-sm text-foreground">{o.part_name}</p>
                            <Badge variant={s.variant}>{s.label}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(o.created_at).toLocaleDateString("bs-BA")}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {o.total_price != null ? `${Number(o.total_price).toFixed(2)} KM` : "Po dogovoru"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader><CardTitle>Lista želja</CardTitle></CardHeader>
              <CardContent>
                {wishLoading ? (
                  <p className="text-muted-foreground text-sm">Učitavanje...</p>
                ) : !wishlistItems?.length ? (
                  <p className="text-muted-foreground text-sm">Lista želja je prazna.</p>
                ) : (
                  <div className="space-y-2">
                    {wishlistItems.map((w: any) => {
                      const p = w.parts;
                      if (!p) return null;
                      return (
                        <div key={w.part_id} className="flex items-center gap-3 border rounded-lg p-3">
                          <Link to={`/dio/${p.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                            {p.slika1 ? (
                              <img src={p.slika1} alt={p.dio} className="w-14 h-14 rounded object-cover flex-shrink-0" />
                            ) : (
                              <div className="w-14 h-14 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground flex-shrink-0">Nema</div>
                            )}
                            <div className="min-w-0">
                              <p className="font-medium text-sm text-foreground truncate">{p.dio}</p>
                              <p className="text-xs text-muted-foreground">{p.marka} {p.tip}</p>
                            </div>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleWishlist.mutate({ partId: w.part_id, isInWishlist: true })}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader><CardTitle>Podaci profila</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email || ""} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prof-name">Ime i prezime</Label>
                    <Input id="prof-name" value={fullName} onChange={e => setFullName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prof-phone">Telefon</Label>
                    <Input id="prof-phone" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prof-address">Adresa</Label>
                    <Input id="prof-address" value={address} onChange={e => setAddress(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? "Spremam..." : "Spremi promjene"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
