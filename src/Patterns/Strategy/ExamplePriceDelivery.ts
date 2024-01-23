interface ShippingStrategy {
  calculateCost(weight: number, distance: number): number;
}

class FedExStrategy implements ShippingStrategy {
  calculateCost(weight: number, distance: number): number {
    return weight * distance;
  }
}

class UPSStrategy implements ShippingStrategy {
  calculateCost(weight: number, distance: number): number {
    return weight + distance;
  }
}

class USPSStrategy implements ShippingStrategy {
  calculateCost(weight: number, distance: number): number {
    return weight + distance + weight;
  }
}

class ShippingCostCalculator {
  private shippingStrategy: ShippingStrategy;

  constructor(shippingStrategy: ShippingStrategy) {
    this.shippingStrategy = shippingStrategy;
  }

  calculateCost(weight: number, distance: number): number {
    return this.shippingStrategy.calculateCost(weight, distance);
  }
  setShippingStrategy(shippingStrategy: ShippingStrategy) {
    this.shippingStrategy = shippingStrategy;
  }
}

const fedExStrategy = new FedExStrategy();
const upsStrategy = new UPSStrategy();
const uspsStrategy = new USPSStrategy();

const calculator = new ShippingCostCalculator(fedExStrategy);
let cost = calculator.calculateCost(10, 100);
console.log(cost); // Output: FedEx shipping cost for a 10 lb package traveling 100 miles

calculator.setShippingStrategy(upsStrategy);
cost = calculator.calculateCost(10, 100);
console.log(cost); // Output: UPS shipping cost for a 10 lb package traveling 100 miles

calculator.setShippingStrategy(uspsStrategy);
cost = calculator.calculateCost(10, 100);
console.log(cost);
