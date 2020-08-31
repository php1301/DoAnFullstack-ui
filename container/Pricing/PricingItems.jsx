import React from 'react';
import PriceCard from 'components/PriceCard/PriceCard';

export default function PricingItems({ user, plans }) {
  return plans.map((plan) => (
    <PriceCard
      user={user}
      className="price_card"
      data={plan}
      key={plan.key}
      buttonText="Select Plan"
    />
  ));
}
