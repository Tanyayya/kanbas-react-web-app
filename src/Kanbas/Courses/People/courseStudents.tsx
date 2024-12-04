import { useEffect, useState } from "react";
import { useParams } from "react-router";

import * as client from "../../Courses/client";
import PeopleTable from "./Table";
export default function CourseStudent() {
    const { cid } = useParams();
    const [users, setUsers] = useState([]); 
  
    useEffect(() => {
      
      const fetchUsers = async () => {
        try {
          const usersData = await client.findUsersForCourse(cid as string); 
          setUsers(usersData); 
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
      if (cid) {
        fetchUsers();
      }
    }, [cid]); 
  return (
   
    <div>
        <PeopleTable users={users} />
    </div>

     
  );
}