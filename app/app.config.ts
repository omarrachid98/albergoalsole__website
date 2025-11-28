export default defineAppConfig({
    ui: {
        checkbox: {
            slots: {
                label: 'text-black font-medium'
            }
        },
        formField: {
            slots: {
                root: 'w-full mb-4',
                label: 'block font-semibold text-black text-base',
                container: 'mt-1 relative w-full',
                error: 'mt-1 text-sm text-red-600',
            },
        },
        textarea: {
            slots: {
                base: 'w-full text-base p-3 rounded-lg border border-gray-300',
            }
        }
    }
});