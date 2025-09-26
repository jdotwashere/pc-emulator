let _files = [
  {
    id: 1,
    name: 'Documents',
    type: 'folder',
    path: 'C:/Users/Guest/Documents'
  },
  {
    id: 2,
    name: 'example_script.js',
    type: 'file',
    path: 'C:/Users/Guest/Documents/example_script.js',
    content: "// Example script\\nwebOS.setBackground('bg-red-700');\\nconsole.log('Script ran.');"
  }
];

let nextId = 3;

export const SimFile = {
  list: async () => [..._files],
  create: async ({ name, type, path, content }) => {
    const file = { id: nextId++, name, type, path, content };
    _files.push(file);
    return file;
  },
  filter: async (query) => {
    if (query.path) {
      return _files.filter(f => f.path === query.path);
    }
    return [];
  }
};
