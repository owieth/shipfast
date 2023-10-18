type TPrice = {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null;
  livemode: boolean;
  lookup_key: null;
  metadata: Metadata;
  nickname: null;
  product: string;
  recurring: Recurring;
  tax_behavior: string;

  tiers_mode: null;
  transform_quantity: null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};

type Metadata = {};

type Recurring = {
  aggregate_usage: null;
  interval: string;
  interval_count: number;
  usage_type: string;
};

type TProduct = {
  id: string;
  object: string;
  active: boolean;
  created: number;
  default_price: null;
  description: null;
  features: any[];
  images: any[];
  livemode: boolean;
  metadata: Metadata;
  name: string;
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: null;
  unit_label: null;
  updated: number;
  url: null;
};

type Metadata = {
  ItemName: string;
  ItemId: string;
  Duration: string;
  Sku: string;
  Service_SKU: string;
};

type SubscriptionPlan = {
  id: string;
  name: string;
  descriptionPoints: string[];
  stripePriceId: string;
  price: number;
};
