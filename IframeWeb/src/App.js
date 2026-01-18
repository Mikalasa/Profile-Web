import TimeLine from "./component/common/TimeLine";
import {SparklesPreview} from "./component/common/SparklesPreview";
import {SpotlightPreview} from "./component/common/SpotlightPreview";

function App() {
  return (
    <div className="App">
        <SpotlightPreview />
        <TimeLine />
        <div className="contact-box">
            <SparklesPreview />
        </div>

    </div>
  );
}

export default App;
