import { CreateGroupButton } from 'components/CreateGroupButton';
import { CreateGroupForm } from 'components/CreateGroupForm';
import { useState } from 'react';

export default function Dashboard() {
  const [createGroup, setCreateGroup] = useState(false);

  const handleCreateGroupClick = () => {
    setCreateGroup(true);
  };
  const handleCloseCreateGroup = () => {
    setCreateGroup(false);
  };
  return (
    <section>
      <h1>Dashboard</h1>
      <CreateGroupButton onClick={handleCreateGroupClick} />
      <CreateGroupForm open={createGroup} onClose={handleCloseCreateGroup} />
    </section>
  );
}
