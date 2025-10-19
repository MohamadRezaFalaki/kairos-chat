/**
 * Get or generate user ID from localStorage
 * This is temporary until we implement real authentication
 */
export function getUserId(): string {
    // Check if running on client side
    if (typeof window === 'undefined') {
        return '';
    }

    const STORAGE_KEY = 'kairos_user_id';

    // Check if user_id exists in localStorage
    let userId = localStorage.getItem(STORAGE_KEY);

    if (!userId) {
        // Generate new UUID for this user
        userId = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, userId);
        console.log('✅ New user ID generated:', userId);
    }

    return userId;
}

/**
 * Clear user ID (for testing purposes)
 */
export function clearUserId(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('kairos_user_id');
        console.log('✅ User ID cleared');
    }
}