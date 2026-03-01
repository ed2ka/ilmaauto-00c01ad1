import { Check } from "lucide-react";

const steps = [
  { key: "nova", label: "Poslana" },
  { key: "primljena", label: "Primljena" },
  { key: "u obradi", label: "Obrađena" },
  { key: "poslano", label: "Na dostavi" },
];

const statusIndex: Record<string, number> = {
  nova: 0,
  primljena: 1,
  "u obradi": 2,
  poslano: 3,
};

interface Props {
  status: string;
}

const OrderStatusStepper = ({ status }: Props) => {
  const activeIdx = statusIndex[status] ?? 0;

  return (
    <div className="flex items-center w-full py-3">
      {steps.map((step, i) => {
        const completed = i <= activeIdx;
        const isLast = i === steps.length - 1;

        return (
          <div key={step.key} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  completed
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-border text-muted-foreground"
                }`}
              >
                {completed ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-[10px] mt-1 whitespace-nowrap ${
                  completed ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Line */}
            {!isLast && (
              <div
                className={`flex-1 h-0.5 mx-1 ${
                  i < activeIdx ? "bg-primary" : "bg-border border-dashed"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatusStepper;
