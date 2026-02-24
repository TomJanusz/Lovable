import type { Item } from "@/stores/itemsStore";

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(item.price);

  const formattedDate = new Date(item.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-lg border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-card-foreground line-clamp-2">
          {item.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <div className="mt-3 flex items-end justify-between">
          <span className="font-display text-xl font-bold text-primary">
            {formattedPrice}
          </span>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          par {item.sellerName}
        </p>
      </div>
    </article>
  );
};

export default ItemCard;
