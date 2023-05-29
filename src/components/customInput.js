import { SearchIcon } from '../assets/icons';

export default function CustomInput({ value, onChange, onKeyDown }) {
  return (
    <div className='search-input'>
      <input
        type='search'
        value={value}
        onChange={onChange}
        className='input'
        onKeyDown={onKeyDown}
        placeholder='Search users by ID, address, name...'
      />
      <div className='search-icon'>
        <SearchIcon />
      </div>
    </div>
  );
}
