import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <div>
        <div className="flex flex-col justify-center items-center">
          <img src="/images/notfound.png" alt="not found pgae" />
          <p className="text-3xl">
            <i className="fa-regular fa-face-frown"></i>&nbsp; Oops...! Page not
            found!
          </p>
          <Link to="/">
            <button className="my-[2rem] border-2 border-black py-[.6rem] px-[2rem]">
              Back to homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
