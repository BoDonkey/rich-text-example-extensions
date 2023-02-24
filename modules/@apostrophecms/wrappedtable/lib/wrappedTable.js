import Table from '@tiptap/extension-table';

const tableClass = self.apos.modules['@apostrophecms/wrappedTable'].ttwrappedTableCongif || 'wrapped-table';

const wrappedTable = Table.configure({
  HTMLAttributes: {
    class: tableClass
  }
});

export { wrappedTable, wrappedTable as default };