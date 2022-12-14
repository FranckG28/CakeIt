import Panel from "../components/panel";
import NewsItem from "./newsItem";

export default function NewsList(props) {
  let news = [...props.news].reverse();

  return (
    <Panel title="News" color="info">
      <div className="flex flex-col gap-3 divide-y-2 divide-info">
        {news.map((item, index) => (
          <NewsItem
            date={props.makeDate(item.date)}
            title={item.name}
            key={index}
          />
        ))}
      </div>
    </Panel>
  );
}
