export default defineAppConfig({
    ui: {
        colors: {
            primary: 'amber',
            neutral: 'zinc',
        },
        input: {
            slots: {
                root: 'w-full',
            },
        },
        textarea: {
            slots: {
                root: 'w-full',
                base: 'w-full text-base p-3 rounded-lg',
            },
        },
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
    }
});