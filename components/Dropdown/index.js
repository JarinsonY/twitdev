import { logout } from "firebase/client";
import { colors } from "styles/theme";

export default function Dropdown() {
  const handleClick = () => {
    logout().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div className="dropdown">
        <button className="dropbtn">+</button>
        <div className="dropdown-content">
          <a onClick={handleClick}>Log out</a>
        </div>
      </div>
      <style jsx>{`
        .dropbtn {
          background-color: ${colors.primary};
          color: white;
          padding: 16px;
          font-size: 16px;
          border: none;
          border-radius: 16px;
          width: 43px;
          cursor: pointer;
        }

        .dropdown {
          /* position: absolute; */
          display: inline-block;
          right: 16px;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          border-radius: 10px;
          margin: 0px 16px auto auto;
          right: 0;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }

        .dropdown-content a {
          color: ${colors.black};
          cursor: pointer;
          border-radius: 10px;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          transition: .3s ease-in-out;
        }

        .dropdown-content a:hover {
          background-color: ${colors.quaternary};
          color: ${colors.white};
          transition: .2s ease-in-out;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        .dropdown:hover .dropbtn {
          background-color: ${colors.quinary};
          transition: .3s ease-in-out;
        }
      `}</style>
    </>
  );
}
