import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { useParams, Link, useLocation } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import HotCollections from "../components/home/HotCollections";

const HotCollectionsUrl =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails/";  

const ItemDetails = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!location.state?.item);

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

useEffect(() => {
  const load = async () => {
    if (location.state?.item) return;
    
    setLoading(true);
    try {
      const { data } = await axios.get(HotCollectionsUrl);
      
      const found = Array.isArray(data)
        ? data.find((x) => String(x.nftId) === String(itemId))
        : null;

      setItem(found || null);
    } catch (e) {
      console.error("Base item load error:", e);
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  load();
}, [itemId, location.state]);

  if (!itemId) {
    return (
      <div className="container mt-5 text-center">
        <h3>Item not found</h3>
        <Link to="/" className="btn-main">Back Home</Link>
      </div>
    );
  }

if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading item...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mt-5 text-center">
        <h3>Item not found</h3>
        <Link to="/" className="btn-main">Back Home</Link>
      </div>
    );
  }


  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {item.title} #{item.code}
                  </h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      468
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      234
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, facilis modi. Dolores, repudiandae corporis fuga accusantium rerum aliquam obcaecati, eius consequuntur voluptatum doloremque porro sed modi laborum amet culpa voluptas?</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp"></div>
                        <Link to={`/author/${item.authorId}`}>
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
                          Author #{item.authorId}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="de_tab tab_simple">
                  <div className="de_tab_content">
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
                          Author #{item.authorId}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="spacer-40"></div>
                  <h6>Price</h6>
                  <div className="nft-item-price">
                    <img src={EthImage} alt="" />
                    <span>0.29</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
