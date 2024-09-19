export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" rows={10} cols={50}>
        The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.

        </textarea>
        <br />
        <table>
  
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
          <select id="wd-group">
                  <option selected value="SCIFI">ASSIGNMENTS</option>
                </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade In</label>
          </td>
          <td>
          <select id="wd-display-grade-as">
                  <option selected value="SCIFI">Percentage</option>
                </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
          <select id="wd-submission-type">
                  <option selected value="SCIFI">Online</option>
                </select>

            <br></br>
            <b>Online Entry Options</b>
            

          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
          <label htmlFor="wd-assign-to">Assign to</label><br/>
            <input id="wd-assign-to" value="Everyone" /><br/>
            <br></br>
            <label htmlFor="wd-due-date">Due</label><br/>
            <input id="wd-due-date" value="Everyone" /><br/><br/>
            
            <tr>
    <td>
      <label htmlFor="wd-available-from">Available from</label><br/>
      <input id="wd-available-from" value="Everyone" />
    </td>
    <td>
      <label htmlFor="wd-until">Until</label><br/>
      <input id="wd-until" value="Everyone" />
    </td>
  </tr>
          </td>
        </tr>
        <tr>
    <td colSpan={2} align="right">
      <hr/>
      <button>Cancel</button> 
      <button>Save</button>
    </td>
  </tr>  
        
      </table>
     
    </div>
);}
