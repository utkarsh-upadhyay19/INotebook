import { useLocation } from 'react-router-dom';

const ReadMore = () => {
  const location = useLocation();
  const { note } = location.state || {};

  if (!note) return <p>No note found.</p>;

  return (
    <div className="contain">
      <h2>{note.tittle}</h2>
      <p>{note.description}</p>
    </div>
  );
};

export default ReadMore
