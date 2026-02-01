/**
 * NewsletterSignup Component
 * 
 * A component that handles email newsletter subscription with validation,
 * loading states, and accessibility features.
 */

class NewsletterSignup {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    this.emailInput = null;
    this.submitButton = null;
    this.errorMessage = null;
    this.successMessage = null;
    this.helperText = null;
    this.isSubmitting = false;

    this.render();
    this.attachEventListeners();
  }

  /**
   * Validates email format (name@domain.tld)
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Renders the component HTML
   */
  render() {
    this.container.innerHTML = `
      <div class="newsletter-signup">
        <h3>Subscribe to Our Newsletter</h3>
        <p id="newsletter-helper" class="helper-text">
          Stay updated with the latest news and events from Mergington High School.
        </p>
        <form id="newsletter-form" novalidate>
          <div class="form-group">
            <label for="newsletter-email">Email Address:</label>
            <input
              type="email"
              id="newsletter-email"
              name="email"
              placeholder="your-email@example.com"
              aria-describedby="newsletter-helper newsletter-error"
              required
            />
          </div>
          <div id="newsletter-error" class="error-message hidden" role="alert" aria-live="polite">
          </div>
          <button type="submit" id="newsletter-submit" disabled>
            <span class="button-text">Subscribe</span>
            <span class="button-loading hidden">Subscribing...</span>
          </button>
        </form>
        <div id="newsletter-success" class="success-message hidden" role="status" aria-live="polite">
        </div>
      </div>
    `;

    this.emailInput = this.container.querySelector('#newsletter-email');
    this.submitButton = this.container.querySelector('#newsletter-submit');
    this.errorMessage = this.container.querySelector('#newsletter-error');
    this.successMessage = this.container.querySelector('#newsletter-success');
    this.helperText = this.container.querySelector('#newsletter-helper');
  }

  /**
   * Attaches event listeners
   */
  attachEventListeners() {
    this.emailInput.addEventListener('input', () => this.handleInput());
    this.container.querySelector('#newsletter-form').addEventListener('submit', (e) => this.handleSubmit(e));
  }

  /**
   * Handles input changes
   */
  handleInput() {
    const email = this.emailInput.value.trim();
    
    // Clear previous messages
    this.hideError();
    this.hideSuccess();

    // Enable/disable button based on validity
    if (email === '') {
      this.submitButton.disabled = true;
      return;
    }

    if (!this.validateEmail(email)) {
      this.showError('Please enter a valid email address (e.g., name@domain.com)');
      this.submitButton.disabled = true;
    } else {
      this.submitButton.disabled = false;
    }
  }

  /**
   * Handles form submission
   */
  async handleSubmit(event) {
    event.preventDefault();

    const email = this.emailInput.value.trim();

    // Validate on submit
    if (!this.validateEmail(email)) {
      this.showError('Please enter a valid email address (e.g., name@domain.com)');
      return;
    }

    // Show loading state
    this.setLoadingState(true);
    this.hideError();
    this.hideSuccess();

    try {
      // Call mock API
      const result = await this.mockApiCall(email);
      
      if (result.success) {
        this.showSuccess('Thank you for subscribing! Check your email for confirmation.');
        this.emailInput.value = '';
      } else {
        this.showError(result.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      this.showError('Failed to subscribe. Please try again later.');
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Mock API call function
   */
  async mockApiCall(email) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success (95% of the time)
    if (Math.random() > 0.05) {
      return { success: true };
    } else {
      return { success: false, message: 'Server error. Please try again.' };
    }
  }

  /**
   * Sets loading state
   */
  setLoadingState(isLoading) {
    this.isSubmitting = isLoading;
    this.emailInput.disabled = isLoading;

    const buttonText = this.submitButton.querySelector('.button-text');
    const buttonLoading = this.submitButton.querySelector('.button-loading');

    if (isLoading) {
      this.submitButton.disabled = true;
      buttonText.classList.add('hidden');
      buttonLoading.classList.remove('hidden');
    } else {
      buttonText.classList.remove('hidden');
      buttonLoading.classList.add('hidden');
      // Only enable button if there's valid email
      const email = this.emailInput.value.trim();
      this.submitButton.disabled = !email || !this.validateEmail(email);
    }
  }

  /**
   * Shows error message
   */
  showError(message) {
    this.errorMessage.textContent = message;
    this.errorMessage.classList.remove('hidden');
  }

  /**
   * Hides error message
   */
  hideError() {
    this.errorMessage.textContent = '';
    this.errorMessage.classList.add('hidden');
  }

  /**
   * Shows success message
   */
  showSuccess(message) {
    this.successMessage.textContent = message;
    this.successMessage.classList.remove('hidden');
  }

  /**
   * Hides success message
   */
  hideSuccess() {
    this.successMessage.textContent = '';
    this.successMessage.classList.add('hidden');
  }
}

// Export for testing (if in Node environment) and browser use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NewsletterSignup;
}
