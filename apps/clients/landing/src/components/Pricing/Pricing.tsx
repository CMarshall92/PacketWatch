import { tiers } from "@/data/pricing";

import PricingColumn from "./PricingColumn";

const Pricing: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {tiers.map((tier, index) => (
      <PricingColumn key={tier.name} tier={tier} highlight={index === 1} />
            ))}
  </div>
    )

export default Pricing
