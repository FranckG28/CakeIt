import Avatar from "./../components/avatar";

export default function CompetitorItem(props) {
  let truncPrice = Number(props.price.toFixed(2));
  let truncMoney = Number(props.money.toFixed(2));

  return (
    <article className="align-center flex flex-row items-center gap-3 px-5 pt-4 pb-2">
      <Avatar className="mask mask-circle w-8" />

      <div className="flex grow flex-col">
        <p className="align-text-bottom">
          <span className="text-md font-bold text-error">
            {props.name + " "}
          </span>
          <span className="text-sm font-light italic text-gray-400">
            {props.status}
          </span>
        </p>
        <p className="text-sm font-light">
          {"Prix de vente : " + truncPrice} €
        </p>
        <p className="text-sm font-light">{"Trésorerie : " + truncMoney} €</p>
      </div>
    </article>
  );
}