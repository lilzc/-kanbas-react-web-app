import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as courseClient from '../client';
import Table from './Table';
import Details from './Details';

export default function People() {
  const { courseId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      if (courseId) {
        try {
          const fetchedUsers = await courseClient.findUsersForCourse(courseId);
          setUsers(fetchedUsers);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadUsers();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>People</h2>
      <Table users={users} />
      <Details />
    </div>
  );
}