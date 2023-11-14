const fileExtensions = [
    'ACC', 'AVI', 'BMP', 'CRD', 'CSV', 'DLL', 'DMG', 'DOC', 'DOCX', 'DWG','EPS', 
    'EXE', 'FLV', 'GIF', 'ISO', 'JPEG', 'JPG', 'MID', 'MKV', 'MP3', 'MP4', 
    'MPEG', 'OGG', 'PCM', 'PDF', 'PNG', 'PPT', 'PSD', 'RAR', 'RAW', 
    'SVG', 'TIFF', 'TXT', 'UNKNOWN', 'WAV', 'WMA', 'XLS', 'ZIP'
];

const lowerCaseExtensions = fileExtensions.map(extension => extension.toLowerCase());

export { fileExtensions, lowerCaseExtensions };