/**
 * Metrics calculation module
 */

const MetricsModule = {
    interKeyLatencies: [],
    lastKeyTime: null,

    /**
     * Record a keystroke timestamp for consistency calculation
     */
    recordKeystroke() {
        const now = performance.now();
        if (this.lastKeyTime !== null) {
            const latency = now - this.lastKeyTime;
            this.interKeyLatencies.push(latency);
        }
        this.lastKeyTime = now;
    },

    /**
     * Reset all recorded data
     */
    reset() {
        this.interKeyLatencies = [];
        this.lastKeyTime = null;
    },

    /**
     * Calculate Words Per Minute
     * @param {number} correctChars - Number of correctly typed characters
     * @param {number} elapsedSeconds - Time elapsed in seconds
     * @returns {number} WPM value
     */
    calculateWPM(correctChars, elapsedSeconds) {
        if (elapsedSeconds <= 0) return 0;
        // Standard: 5 characters = 1 word
        return Math.round((correctChars / 5) / (elapsedSeconds / 60));
    },

    /**
     * Calculate Raw WPM (includes mistakes)
     * @param {number} totalChars - Total characters typed
     * @param {number} elapsedSeconds - Time elapsed in seconds
     * @returns {number} Raw WPM value
     */
    calculateRawWPM(totalChars, elapsedSeconds) {
        if (elapsedSeconds <= 0) return 0;
        return Math.round((totalChars / 5) / (elapsedSeconds / 60));
    },

    /**
     * Calculate Accuracy percentage (Strict: based on keystrokes)
     * @param {number} totalKeystrokes - Total keys pressed
     * @param {number} mistakeKeystrokes - Total wrong keys pressed
     * @returns {number} Accuracy percentage (0-100)
     */
    calculateAccuracy(totalKeystrokes, mistakeKeystrokes) {
        if (totalKeystrokes === 0) return 100;
        const accuracy = ((totalKeystrokes - mistakeKeystrokes) / totalKeystrokes) * 100;
        return Math.max(0, Math.round(accuracy));
    },

    /**
     * Legacy Accuracy (based on final text) - kept for reference if needed
     */
    calculateFinalAccuracy(correctChars, totalChars) {
        if (totalChars <= 0) return 100;
        return Math.round((correctChars / totalChars) * 100);
    },

    /**
     * Calculate standard deviation of inter-key latencies
     * @returns {number} Standard deviation in milliseconds
     */
    calculateConsistencySD() {
        if (this.interKeyLatencies.length < 2) return 0;

        const n = this.interKeyLatencies.length;
        const mean = this.interKeyLatencies.reduce((a, b) => a + b, 0) / n;
        const squaredDiffs = this.interKeyLatencies.map(x => Math.pow(x - mean, 2));
        const variance = squaredDiffs.reduce((a, b) => a + b, 0) / n;

        return Math.sqrt(variance);
    },

    /**
     * Calculate Consistency score (0-100)
     * Lower SD = higher consistency
     * @returns {number} Consistency percentage
     */
    calculateConsistency() {
        const sd = this.calculateConsistencySD();
        // Map SD to percentage: SD of 0 = 100%, SD of 100ms+ = ~50%
        // Using exponential decay
        const consistency = Math.round(100 * Math.exp(-sd / 150));
        return Math.max(0, Math.min(100, consistency));
    },

    /**
     * Get all metrics at once
     * @param {number} correctChars
     * @param {number} totalChars
     * @param {number} mistakes
     * @param {number} elapsedSeconds
     * @param {number} totalKeystrokes
     * @param {number} mistakeKeystrokes
     * @returns {Object} All metrics
     */
    getAllMetrics(correctChars, totalChars, mistakes, elapsedSeconds, totalKeystrokes, mistakeKeystrokes) {
        return {
            wpm: this.calculateWPM(correctChars, elapsedSeconds),
            rawWpm: this.calculateRawWPM(totalChars, elapsedSeconds),
            accuracy: this.calculateAccuracy(totalKeystrokes, mistakeKeystrokes),
            consistency: this.calculateConsistency(),
            mistakes: mistakes
        };
    }
};

window.MetricsModule = MetricsModule;
