export default function Card({
  item,
  index,
  isHighlighted,
  onClick,
  onMouseEnter,
  onMouseLeave,
  searchQuery,
  cardRefs,
}) {
  const highlightText = (text, term) => {
    const regex = new RegExp(`(${term})`, 'gi');

    return text.split(regex).map((part, index) =>
      regex.test(part) && term ? (
        <span key={index} style={{ color: 'blue' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={`listItem ${isHighlighted ? 'highlighted' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      tabIndex={isHighlighted ? 0 : -1} // Modified
      ref={(ref) => (cardRefs.current[index] = ref)}
    >
      <div>
        <span className='cardId'>{highlightText(item.id, searchQuery)}</span>
        <br />
        <span className='cardName'>
          {highlightText(item.name, searchQuery)}
        </span>
        <br />
        <span className='cardAddress'>
          {highlightText(item.address, searchQuery)}
        </span>
      </div>
    </div>
  );
}
