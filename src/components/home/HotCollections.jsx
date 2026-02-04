import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollectionsUrl = 
"https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotCollections = async () => {
      try {
        const { data } = await axios.get(HotCollectionsUrl);
        setCollections(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading && (
            <div className="col-lg-12">
              <p>Loading...</p>
            </div>
          )}

          {!loading &&
            collections.map((item) => {
              const itemId = item.nftId;
              const authorId = item.authorId;

              return (
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={itemId}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${itemId}`} state={{ item }}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt={item.title || "Collection"}
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to={`/author/${authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt={item.author || "Author"}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to={`/item-details/${itemId}`} state={{ item }}>
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;