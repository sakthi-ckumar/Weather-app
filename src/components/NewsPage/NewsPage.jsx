// src/components/NewsPage/NewsPage.jsx
import React from "react";
import { connect } from "react-redux";
import "./NewsPage.css";
import FigureCaption from "react-bootstrap/esm/FigureCaption";

class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      category: props.selectedCategories[0] || "All",
    };
  }

  componentDidMount() {
    this.loadNews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.selectedCategories[0] !== this.props.selectedCategories[0] ||
      prevState.category !== this.state.category
    ) {
      this.loadNews();
    }
  }

  loadNews = async () => {
    const { category } = this.state;
    const apiKey = "2f9f600389599c3145105ee2adc488eb";
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, "data");
      this.setState({
        news: data.articles || [],
      });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  };

  render() {
    const { news, category } = this.state;
    const categories = [
      "general",
      "world",
      "nation",
      "business",
      "technology",
      "entertainment",
      "sports",
      "science",
      "health",
    ];

    return (
      <div>
        <h1>EveryDay News</h1>
        <h2>{category}</h2>

        {/* <select value={category} onChange={this.handleCategoryChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select> */}

        <div className="newsPage">
          {news.map((x) => (
            <div key={x.url}>
              <hr />
              <figure className="card card-product">
                <div className="img-wrap">
                  <img className="img-responsive" src={x.image} alt="" />
                </div>

                <figtitle className="info-wrap">
                  <p className="title">{x.title}</p>
                </figtitle>

                <FigureCaption className="info-wrap">
                  <span>
                    Published on:{" "}
                    {new Intl.DateTimeFormat("en-GB", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    }).format(new Date(x.publishedAt))}
                  </span>
                  <p>{x.description}</p>
                </FigureCaption>

                <FigureCaption className="read-more">
                  <i>
                    Read More:{" "}
                    <a href={x.url} target="_blank" rel="noopener noreferrer">
                      {x.source.name}
                    </a>
                  </i>
                </FigureCaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCategories: state.settings.selectedCategories,
});

export default connect(mapStateToProps)(NewsPage);
