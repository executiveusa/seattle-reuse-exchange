export default function TaxReceiptPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Tax Receipt Information</h1>
        
        <div className="bg-card p-8 rounded-2xl shadow-md mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">501(c)(3) Non-Profit Status</h2>
              <p className="text-muted-foreground">
                New World Kids is a registered 501(c)(3) non-profit organization. 
                Your donations may be tax-deductible to the extent allowed by law.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Claim Your Deduction</h2>
            <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong>Document your donation:</strong> Keep a detailed list of items donated, 
                including descriptions and estimated fair market values.
              </li>
              <li>
                <strong>Receive your receipt:</strong> We will provide you with an official 
                donation receipt within 2 business days of receiving your items.
              </li>
              <li>
                <strong>For donations over $500:</strong> Complete IRS Form 8283 and attach 
                it to your tax return.
              </li>
              <li>
                <strong>For donations over $5,000:</strong> A qualified appraisal may be required.
              </li>
            </ol>
          </section>
          
          <section className="bg-warning/10 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Important Notice</h3>
            <p className="text-sm text-muted-foreground">
              This information is for general guidance only and should not be considered tax 
              advice. Please consult with a qualified tax professional for specific guidance 
              on your situation.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Download Your Receipt</h2>
            <p className="text-muted-foreground mb-4">
              Once your donation is processed, you can download your tax receipt from your 
              dashboard or request a copy via email.
            </p>
            <button className="btn-primary px-6 py-3 rounded-2xl font-medium">
              View My Receipts
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
