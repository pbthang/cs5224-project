import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, forwardRef, useState } from "react";

type ExperienceData = {
  position: string;
  organization: string;
  dates: string;
  description: string;
};

type ExprInputProps = InputProps & {
  value: ExperienceData[];
  onChange: Dispatch<SetStateAction<ExperienceData[]>>;
};

const emptyDataPoint: ExperienceData = {
  position: "",
  organization: "",
  dates: "",
  description: "",
};

export const ExprInput = forwardRef<HTMLInputElement, ExprInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] =
      useState<ExperienceData>(emptyDataPoint);

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint(emptyDataPoint);
      }
    };

    return (
      <>
        <div className="flex">
          <Input
            value={pendingDataPoint.position}
            onChange={(e) =>
              setPendingDataPoint((data) => ({
                ...data,
                position: e.target.value,
              }))
            }
            className="rounded-r-none"
            {...props}
            ref={ref}
          />
          <Button
            type="button"
            variant="secondary"
            className="rounded-l-none border border-l-0"
            onClick={addPendingDataPoint}
          >
            Add
          </Button>
        </div>
        <div className="border rounded-md min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center">
          {value.map((item, idx) => (
            <Badge key={idx} variant="secondary">
              {JSON.stringify(item)}
              <button
                type="button"
                className="w-3 ml-2"
                onClick={() => {
                  onChange(value.filter((i) => i !== item));
                }}
              >
                <XIcon className="w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </>
    );
  }
);
