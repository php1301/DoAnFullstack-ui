import React from 'react';
import PriceCard from 'components/PriceCard/PriceCard';

export default function PricingItems({ plans }) {
  return plans.map((plan) => (
    <PriceCard
      className="price_card"
      data={plan}
      key={plan.title}
      buttonText="Select Plan"
    />
  ));
}
