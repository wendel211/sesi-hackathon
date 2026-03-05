class MockQueryBuilder {
    select() { return this; }
    insert() { return Promise.resolve({ error: null }); }
    update() { return Promise.resolve({ error: null }); }
    delete() { return Promise.resolve({ error: null }); }
    eq() { return this; }
    order() { return this; }
    limit() { return this; }
    maybeSingle() { return Promise.resolve({ data: null, error: null }); }
    then(resolve: any) { return Promise.resolve({ data: [], error: null }).then(resolve); }
}

export const supabase = {
    auth: {
        getSession: async () => ({ data: { session: { user: { id: 'mock-user-id' } } } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        signInWithPassword: async () => ({ error: null }),
        signUp: async () => ({ data: { user: { id: 'mock-user-id' } }, error: null }),
        signOut: async () => ({ error: null }),
    },
    from: () => new MockQueryBuilder()
} as any;
