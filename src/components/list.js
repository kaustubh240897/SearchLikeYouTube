import Card from './customCard';

export default function List({
  results,
  selectedItem,
  handleCardClick,
  handleCardMouseEnter,
  handleCardMouseLeave,
  searchQuery,
  cardRefs,
}) {
  return results.length > 0 ? (
    <div>
      {results.map((item, index) => (
        <Card
          key={index}
          index={index}
          item={item}
          isHighlighted={selectedItem === index}
          onClick={() => handleCardClick(index)}
          onMouseEnter={() => handleCardMouseEnter(index, item.id)}
          onMouseLeave={handleCardMouseLeave}
          searchQuery={searchQuery}
          cardRefs={cardRefs}
        />
      ))}
    </div>
  ) :  (
    <div className='emptyContainer'>
      <h3>No User Found</h3>
    </div>
  );
}
