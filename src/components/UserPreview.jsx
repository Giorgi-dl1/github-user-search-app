import "./UserPreview.css";
import locationIcon from "../assets/icon-location.svg";
import companyIcon from "../assets/icon-company.svg";
import twitterIcon from "../assets/icon-twitter.svg";
import websiteIcon from "../assets/icon-website.svg";

export default function UserPreview({ data }) {
  const createdAt = data.created_at.split("T")[0].split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="preview-wrapper">
      <div className="preview-header">
        <div className="avatar">
          <img src={data.avatar_url} alt="avatar" />
        </div>
        <div className="name-jd">
          <div>
            <h2>{data.name || data.login}</h2>
            <p>@{data.login}</p>
          </div>

          <p>
            Joined {createdAt[2]} {months[createdAt[1] - 1]} {createdAt[0]}
          </p>
        </div>
      </div>

      <div className="preview">
        <div className="bio">{data.bio || "This profilehas no bio"}</div>
        <div className="stats">
          <div className="stat">
            <div className="label">Repos</div>
            <div className="quantity">{data.public_repos}</div>
          </div>
          <div className="stat">
            <div className="label">Followers</div>
            <div className="quantity">{data.followers}</div>
          </div>
          <div className="stat">
            <div className="label">Following</div>
            <div className="quantity">{data.following}</div>
          </div>
        </div>
        <div className="preview-footer">
          <div className={!data.location ? "light-opacity" : ""}>
            <img src={locationIcon} alt="icon" />
            <span>{data.location || "Not available"} </span>
          </div>
          <div className={!data.twitter_username ? "light-opacity" : ""}>
            <img src={twitterIcon} alt="icon" />
            <span>{data.twitter_username || "Not available"} </span>
          </div>
          <div className={!data.blog ? "light-opacity" : ""}>
            <img src={websiteIcon} alt="icon" />
            <a href={data.blog} target="_blank" rel="noreferrer">
              <span>{data.blog || "Not available"} </span>
            </a>
          </div>
          <div className={!data.company ? "light-opacity" : ""}>
            <img src={companyIcon} alt="icon" />
            <span>{data.company || "Not available"} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
