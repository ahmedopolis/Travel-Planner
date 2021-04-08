import { runAction } from "./js/formHandler";
import { mainHeadingRandomColorEdit } from "./js/header";

import "./styles/main.scss";
import "./styles/footer.scss";
import "./styles/header.scss";
import "./styles/form.scss";
import "./styles/results.scss";

function loadStarter() {
  if (document.readyState === "complete") {
    window.addEventListener("load", runAction);
    mainHeadingRandomColorEdit();
  } else {
    window.addEventListener("load", runAction);
    mainHeadingRandomColorEdit();
    return () => window.removeEventListener("load", runAction);
  }
}

loadStarter();
