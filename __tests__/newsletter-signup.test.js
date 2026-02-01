/**
 * Unit tests for NewsletterSignup component
 */

const NewsletterSignup = require('../src/static/newsletter-signup');

describe('NewsletterSignup Component', () => {
  let container;
  let component;

  beforeEach(() => {
    // Create a container element
    container = document.createElement('div');
    container.id = 'test-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
    component = null;
  });

  describe('Initialization', () => {
    test('should render the component with all required elements', () => {
      component = new NewsletterSignup('test-container');

      expect(container.querySelector('#newsletter-email')).toBeInTheDocument();
      expect(container.querySelector('#newsletter-submit')).toBeInTheDocument();
      expect(container.querySelector('#newsletter-error')).toBeInTheDocument();
      expect(container.querySelector('#newsletter-success')).toBeInTheDocument();
      expect(container.querySelector('#newsletter-helper')).toBeInTheDocument();
    });

    test('should throw error if container not found', () => {
      expect(() => {
        new NewsletterSignup('non-existent-container');
      }).toThrow('Container with id "non-existent-container" not found');
    });
  });

  describe('Email Validation', () => {
    beforeEach(() => {
      component = new NewsletterSignup('test-container');
    });

    test('should validate correct email format', () => {
      expect(component.validateEmail('user@example.com')).toBe(true);
      expect(component.validateEmail('test.user@domain.co.uk')).toBe(true);
      expect(component.validateEmail('name+tag@example.org')).toBe(true);
    });

    test('should reject invalid email formats', () => {
      expect(component.validateEmail('')).toBe(false);
      expect(component.validateEmail('invalid')).toBe(false);
      expect(component.validateEmail('invalid@')).toBe(false);
      expect(component.validateEmail('@example.com')).toBe(false);
      expect(component.validateEmail('user@domain')).toBe(false);
      expect(component.validateEmail('user @example.com')).toBe(false);
    });
  });

  describe('Button State', () => {
    beforeEach(() => {
      component = new NewsletterSignup('test-container');
    });

    test('should have button disabled initially when input is empty', () => {
      const button = container.querySelector('#newsletter-submit');
      expect(button).toBeDisabled();
    });

    test('should enable button when valid email is entered', () => {
      const input = container.querySelector('#newsletter-email');
      const button = container.querySelector('#newsletter-submit');

      input.value = 'valid@example.com';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(button).not.toBeDisabled();
    });

    test('should disable button when invalid email is entered', () => {
      const input = container.querySelector('#newsletter-email');
      const button = container.querySelector('#newsletter-submit');

      input.value = 'invalid-email';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(button).toBeDisabled();
    });

    test('should disable button when input is cleared', () => {
      const input = container.querySelector('#newsletter-email');
      const button = container.querySelector('#newsletter-submit');

      // First enter valid email
      input.value = 'valid@example.com';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      expect(button).not.toBeDisabled();

      // Then clear it
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      expect(button).toBeDisabled();
    });
  });

  describe('Validation on Input Change', () => {
    beforeEach(() => {
      component = new NewsletterSignup('test-container');
    });

    test('should show error message for invalid email on input', () => {
      const input = container.querySelector('#newsletter-email');
      const errorMessage = container.querySelector('#newsletter-error');

      input.value = 'invalid-email';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(errorMessage).toHaveTextContent('Please enter a valid email address');
      expect(errorMessage).not.toHaveClass('hidden');
    });

    test('should hide error message for valid email on input', () => {
      const input = container.querySelector('#newsletter-email');
      const errorMessage = container.querySelector('#newsletter-error');

      // First show error
      input.value = 'invalid-email';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      expect(errorMessage).not.toHaveClass('hidden');

      // Then enter valid email
      input.value = 'valid@example.com';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(errorMessage).toHaveClass('hidden');
    });
  });

  describe('Form Submission - Success', () => {
    beforeEach(() => {
      component = new NewsletterSignup('test-container');
      // Mock the API call to always succeed
      component.mockApiCall = jest.fn().mockResolvedValue({ success: true });
    });

    test('should call API with email on valid submit', async () => {
      const input = container.querySelector('#newsletter-email');
      const form = container.querySelector('#newsletter-form');

      input.value = 'test@example.com';
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(component.mockApiCall).toHaveBeenCalledWith('test@example.com');
    });

    test('should show success message on successful submit', async () => {
      const input = container.querySelector('#newsletter-email');
      const form = container.querySelector('#newsletter-form');
      const successMessage = container.querySelector('#newsletter-success');

      input.value = 'test@example.com';
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(successMessage).toHaveTextContent('Thank you for subscribing');
      expect(successMessage).not.toHaveClass('hidden');
    });

    test('should clear input after successful submit', async () => {
      const input = container.querySelector('#newsletter-email');
      const form = container.querySelector('#newsletter-form');

      input.value = 'test@example.com';
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(input.value).toBe('');
    });

    test('should disable button after successful submit', async () => {
      const input = container.querySelector('#newsletter-email');
      const form = container.querySelector('#newsletter-form');
      const button = container.querySelector('#newsletter-submit');

      input.value = 'test@example.com';
      
      // Dispatch submit event and wait for async operations
      const submitPromise = component.handleSubmit(new Event('submit', { bubbles: true }));
      await submitPromise;

      expect(button).toBeDisabled();
    });
  });

  describe('Form Submission - Error', () => {
    beforeEach(() => {
      component = new NewsletterSignup('test-container');
    });

    test('should show error message on API failure', async () => {
      component.mockApiCall = jest.fn().mockResolvedValue({
        success: false,
        message: 'Server error'
      });

      const input = container.querySelector('#newsletter-email');
      const form = container.querySelector('#newsletter-form');
      const errorMessage = container.querySelector('#newsletter-error');

      input.value = 'test@example.com';
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(errorMessage).toHaveTextContent('Server error');
      expect(errorMessage).not.toHaveClass('hidden');
    });

    test('should show error message on API exception', async () => {
      component.mockApiCall = jest.fn().mockRejectedValue(new Error('Network error'));

      const input = container.querySelector('#newsletter-email');
      const form = container.querySelector('#newsletter-form');
      const errorMessage = container.querySelector('#newsletter-error');

      input.value = 'test@example.com';
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(errorMessage).toHaveTextContent('Failed to subscribe');
      expect(errorMessage).not.toHaveClass('hidden');
    });

    test('should not submit if email is invalid', async () => {
      component.mockApiCall = jest.fn().mockResolvedValue({ success: true });

      const input = container.querySelector('#newsletter-email');
      const form = container.querySelector('#newsletter-form');
      const errorMessage = container.querySelector('#newsletter-error');

      input.value = 'invalid-email';
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(component.mockApiCall).not.toHaveBeenCalled();
      expect(errorMessage).toHaveTextContent('Please enter a valid email address');
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      component = new NewsletterSignup('test-container');
      // Mock API to delay so we can test loading state
      component.mockApiCall = jest.fn(() => 
        new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
      );
    });

    test('should show loading state during submission', async () => {
      const input = container.querySelector('#newsletter-email');
      const form = container.querySelector('#newsletter-form');
      const button = container.querySelector('#newsletter-submit');
      const buttonLoading = button.querySelector('.button-loading');
      const buttonText = button.querySelector('.button-text');

      input.value = 'test@example.com';
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      // Check loading state immediately after submit
      await new Promise(resolve => setTimeout(resolve, 10));

      expect(button).toBeDisabled();
      expect(input).toBeDisabled();
      expect(buttonLoading).not.toHaveClass('hidden');
      expect(buttonText).toHaveClass('hidden');

      // Wait for completion
      await new Promise(resolve => setTimeout(resolve, 200));

      expect(buttonLoading).toHaveClass('hidden');
      expect(buttonText).not.toHaveClass('hidden');
    });

    test('should disable controls during submission', async () => {
      const input = container.querySelector('#newsletter-email');
      const form = container.querySelector('#newsletter-form');
      const button = container.querySelector('#newsletter-submit');

      input.value = 'test@example.com';
      form.dispatchEvent(new Event('submit', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 10));

      expect(button).toBeDisabled();
      expect(input).toBeDisabled();

      await new Promise(resolve => setTimeout(resolve, 200));
    });
  });

  describe('Accessibility - ARIA Attributes', () => {
    beforeEach(() => {
      component = new NewsletterSignup('test-container');
    });

    test('should have label associated with input', () => {
      const input = container.querySelector('#newsletter-email');
      const label = container.querySelector('label[for="newsletter-email"]');

      expect(label).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'newsletter-email');
    });

    test('should have aria-describedby on input', () => {
      const input = container.querySelector('#newsletter-email');
      
      expect(input).toHaveAttribute('aria-describedby');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toContain('newsletter-helper');
      expect(describedBy).toContain('newsletter-error');
    });

    test('should have role="alert" on error message', () => {
      const errorMessage = container.querySelector('#newsletter-error');
      
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    test('should have aria-live on error message', () => {
      const errorMessage = container.querySelector('#newsletter-error');
      
      expect(errorMessage).toHaveAttribute('aria-live', 'polite');
    });

    test('should have role="status" on success message', () => {
      const successMessage = container.querySelector('#newsletter-success');
      
      expect(successMessage).toHaveAttribute('role', 'status');
    });

    test('should have aria-live on success message', () => {
      const successMessage = container.querySelector('#newsletter-success');
      
      expect(successMessage).toHaveAttribute('aria-live', 'polite');
    });

    test('should announce error message to screen readers', () => {
      const input = container.querySelector('#newsletter-email');
      const errorMessage = container.querySelector('#newsletter-error');

      input.value = 'invalid-email';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(errorMessage).toHaveAttribute('role', 'alert');
      expect(errorMessage).toHaveTextContent('Please enter a valid email address');
    });
  });
});
