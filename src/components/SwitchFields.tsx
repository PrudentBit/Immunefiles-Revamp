import { Switch } from '@/components/ui/switch';
import Image from 'next/image';

type Props = {
  label: string;
  svg: string;
  svgSize?: number;
  checked: boolean;
  setChecked: (_value: boolean) => void;
};

const SwitchFields = ({ label, svg, svgSize, checked, setChecked }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <div className="w-5">
          <Image
            src={svg}
            width={svgSize ?? 14}
            height={svgSize ?? 14}
            alt={label}
          />
        </div>
        <p className="text-primary_font">{label}</p>
      </div>
      <Switch
        id={label}
        className=""
        checked={checked}
        onCheckedChange={() => setChecked(!checked)}
      />
    </div>
  );
};

export default SwitchFields;
