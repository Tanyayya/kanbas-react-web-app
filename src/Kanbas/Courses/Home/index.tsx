import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <table id="wd-home">
      <tr>
        
      <td valign="top" colSpan={2} >
          <table>
            <tr>
              <td><button>Collapse All</button></td>
              <td><button>View Progress</button></td>
              <td>
                <select id="wd-select-one-genre">
                  <option selected value="SCIFI">Publish All</option>
                </select>
              </td>
              <td><button>+ Module</button></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td valign="top">
          <Modules />
        </td>
        <td valign="top">
          <CourseStatus />
        </td>
      </tr>
    </table>
  );
}

