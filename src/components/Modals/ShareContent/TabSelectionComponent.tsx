type Props = {
  tab: 'link' | 'email' | 'internal' | 'groups';
  setTab: (_tab: 'link' | 'email' | 'internal' | 'groups') => void;
};

const TabSelectionComponent = ({ tab, setTab }: Props) => {
  return (
    <div className="flex justify-between items-center h-[16%]">
      <button
        className={`rounded-full w-[23%] h-8 flex items-center justify-center ${
          tab === 'link' ? 'bg-primary_font_2 text-white' : ' text-[#333333]'
        }`}
        onClick={(e) => {
          setTab('link'),
          e.stopPropagation()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke={`${tab === 'link' ? 'white' : '#333333'}`}
            d="M9.00014 15.0003L15.0001 9.00031M11.0001 6.00031L11.4631 5.46431C12.4009 4.52663 13.6728 3.99991 14.999 4C16.3252 4.00009 17.597 4.527 18.5346 5.46481C19.4723 6.40261 19.999 7.6745 19.9989 9.00066C19.9989 10.3268 19.4719 11.5986 18.5341 12.5363L18.0001 13.0003M13.0001 18.0003L12.6031 18.5343C11.6544 19.4725 10.3739 19.9987 9.03964 19.9987C7.70535 19.9987 6.42489 19.4725 5.47614 18.5343C5.0085 18.0719 4.63724 17.5213 4.38385 16.9144C4.13047 16.3076 4 15.6565 4 14.9988C4 14.3412 4.13047 13.69 4.38385 13.0832C4.63724 12.4763 5.0085 11.9257 5.47614 11.4633L6.00014 11.0003"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="ml-2">Generate link</p>
      </button>

      <button
        className={`rounded-full w-[23%] h-8 flex items-center justify-center ${
          tab === 'email' ? 'bg-primary_font_2 text-white' : ' text-[#333333]'
        }`}
        onClick={(e) => {
          setTab('email'),
          e.stopPropagation()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke={`${tab === 'email' ? 'white' : '#333333'}`}
            d="M7 9L12 12.5L17 9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            stroke={`${tab === 'email' ? 'white' : '#333333'}`}
            d="M2 17V7C2 6.46957 2.21071 5.96086 2.58579 5.58579C2.96086 5.21071 3.46957 5 4 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7V17C22 17.5304 21.7893 18.0391 21.4142 18.4142C21.0391 18.7893 20.5304 19 20 19H4C3.46957 19 2.96086 18.7893 2.58579 18.4142C2.21071 18.0391 2 17.5304 2 17Z"
            strokeWidth="1.5"
          />
        </svg>
        <p className="ml-2">Send mail</p>
      </button>

      <button
        className={`rounded-full w-[23%] h-8 flex items-center justify-center ${
          tab === 'internal'
            ? 'bg-primary_font_2 text-white'
            : ' text-[#333333]'
        }`}
        onClick={(e) => {
          setTab('internal'),
          e.stopPropagation()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke={`${tab === 'internal' ? 'white' : '#333333'}`}
            d="M20.3877 22V20.2143C20.3877 17.2557 17.6691 14.8571 14.3159 14.8571H9.45953C6.10628 14.8571 3.3877 17.2557 3.3877 20.2143V22M16.1377 6.28571C16.1377 7.42236 15.6899 8.51245 14.8929 9.31617C14.0959 10.1199 13.0149 10.5714 11.8877 10.5714C10.7605 10.5714 9.67952 10.1199 8.88249 9.31617C8.08546 8.51245 7.6377 7.42236 7.6377 6.28571C7.6377 5.14907 8.08546 4.05898 8.88249 3.25526C9.67952 2.45153 10.7605 2 11.8877 2C13.0149 2 14.0959 2.45153 14.8929 3.25526C15.6899 4.05898 16.1377 5.14907 16.1377 6.28571Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="ml-2">Internal share</p>
      </button>

      <button
        className={`rounded-full w-[23%] h-8 flex items-center justify-center ${
          tab === 'groups' ? 'bg-primary_font_2 text-white' : ' text-[#333333]'
        }`}
        onClick={(e) => {
          setTab('groups'),
          e.stopPropagation()
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke={`${tab === 'groups' ? 'white' : '#333333'}`}
            d="M1 20V19C1 17.1435 1.7375 15.363 3.05025 14.0503C4.36301 12.7375 6.14348 12 8 12C9.85652 12 11.637 12.7375 12.9497 14.0503C14.2625 15.363 15 17.1435 15 19V20"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            stroke={`${tab === 'groups' ? 'white' : '#333333'}`}
            d="M13 14C13 12.6739 13.5268 11.4021 14.4645 10.4645C15.4021 9.52678 16.6739 9 18 9C18.6566 9 19.3068 9.12933 19.9134 9.3806C20.52 9.63188 21.0712 10.0002 21.5355 10.4645C21.9998 10.9288 22.3681 11.48 22.6194 12.0866C22.8707 12.6932 23 13.3434 23 14V14.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            stroke={`${tab === 'groups' ? 'white' : '#333333'}`}
            d="M8 12C9.06087 12 10.0783 11.5786 10.8284 10.8284C11.5786 10.0783 12 9.06087 12 8C12 6.93913 11.5786 5.92172 10.8284 5.17157C10.0783 4.42143 9.06087 4 8 4C6.93913 4 5.92172 4.42143 5.17157 5.17157C4.42143 5.92172 4 6.93913 4 8C4 9.06087 4.42143 10.0783 5.17157 10.8284C5.92172 11.5786 6.93913 12 8 12ZM18 9C18.7956 9 19.5587 8.68393 20.1213 8.12132C20.6839 7.55871 21 6.79565 21 6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3C17.2044 3 16.4413 3.31607 15.8787 3.87868C15.3161 4.44129 15 5.20435 15 6C15 6.79565 15.3161 7.55871 15.8787 8.12132C16.4413 8.68393 17.2044 9 18 9Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="ml-2">Share in groups</p>
      </button>
    </div>
  );
};

export default TabSelectionComponent;
