import FilterIcon from "@mui/icons-material/Filter";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

function DetailMess() {
  return (
    <div className="Mess_contain">
      <div>
        <div className="mess_show">
          <div className="mess_show_item"></div>
        </div>
        <div className="mess_input">
          <div
            className="mess_input_text"
            contentEditable="true"
            placeholder="Aa"
          ></div>
          <div className="mess_input_other">
            <button>
              <FilterIcon></FilterIcon>
            </button>
            <button>
              <SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailMess;
