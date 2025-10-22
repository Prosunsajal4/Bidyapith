import { useLoaderData } from "react-router";
import NewsCard from "../components/NewsCard";

const TotalNews = () => {
  const data = useLoaderData();

  return (
    <div>
      <h2 className="font-bold mb-5">
        Total <span className="text-secondary">{data.length}</span> news Found
      </h2>

      <div className="grid grid-cols-1 gap-5">
        {data.map((news) => (
          <NewsCard key={news.id} news={news}></NewsCard>
        ))}
      </div>
    </div>
  );
};

export default TotalNews;
