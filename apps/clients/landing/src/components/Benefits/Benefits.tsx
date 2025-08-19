import { benefits } from "@/data/benefits"

import BenefitSection from "./BenefitSection"

const Benefits: React.FC = () => (
  <div id="features">
    <h2 className="sr-only">Features</h2>
    {benefits.map((item, index) => <BenefitSection key={item.title} benefit={item} imageAtRight={index % 2 !== 0} />)}
  </div>
    )

export default Benefits
