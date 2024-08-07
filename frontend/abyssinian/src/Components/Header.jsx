import logoPic from "../assets/logo.jpg";
function Header() {
  return (
    <header className="main_header">
      <img src={logoPic} />
      <nav>
        <ul>
          <div>
            <li>
              <a
                onClick={(event) => {
                  handleClicks(event);
                }}
                href="/"
              >
                Home
              </a>
            </li>
          </div>
          <div>
            <li>
              <a
                onClick={(event) => {
                  handleClicks(event);
                }}
                href="/chat"
              >
                chat
              </a>
            </li>
          </div>
          <li>
            <a
              onClick={(event) => {
                handleClicks(event);
              }}
            >
              About
            </a>
          </li>
          <div></div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
