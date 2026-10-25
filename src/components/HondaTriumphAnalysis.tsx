type Locale = 'en' | 'fa';

const costRows: Array<{ en: string; fa: string; triumph: string; honda: string; kind?: string }> = [
  { en: 'Retail price', fa: 'قیمت خرده‌فروشی', triumph: '$2,495', honda: '$2,112', kind: 'price-row' },
  { en: 'Dealer markup', fa: 'حاشیهٔ فروشنده', triumph: '$648', honda: '$528' },
  { en: 'Wholesale price', fa: 'قیمت عمده‌فروشی', triumph: '$1,847', honda: '$1,584', kind: 'wholesale-row' },
  { en: 'Engine cost', fa: 'هزینهٔ موتور', triumph: '$484', honda: '$349' },
  { en: 'Assembly', fa: 'مونتاژ', triumph: '$121', honda: '$118' },
  { en: 'Components', fa: 'قطعات', triumph: '$606', honda: '$437' },
  { en: 'Research & development', fa: 'تحقیق و توسعه', triumph: '$116', honda: '$28–54' },
  { en: 'Freight, packing & duty', fa: 'حمل‌ونقل، بسته‌بندی و عوارض', triumph: '$175', honda: '$163' },
  { en: 'Advertising', fa: 'تبلیغات', triumph: '$58', honda: '$23–44' },
  { en: 'Other selling & distribution', fa: 'سایر هزینه‌های فروش و توزیع', triumph: '$267', honda: '$215–236' },
  { en: 'Total cost', fa: 'کل هزینه', triumph: '$1,827', honda: '$1,354–1,380', kind: 'total-row' },
];

export default function HondaTriumphAnalysis({ locale }: { locale: Locale }) {
  const fa = locale === 'fa';

  return (
    <div className="honda-triumph-analysis" dir={fa ? 'rtl' : 'ltr'} lang={locale}>
      <section className="mba-cost-table" aria-labelledby="honda-cost-title">
        <div className="table-frame">
          <header className="table-heading">
            <p className="eyebrow">{fa ? 'مزیت رقابتی · ساختار هزینه' : 'Competitive Advantage · Cost Structure'}</p>
            <h2 id="honda-cost-title">{fa ? 'هوندا در برابر تریومف / NVT' : 'Honda vs. Triumph / NVT'}</h2>
            <p className="subtitle">{fa ? 'هزینهٔ برآوردی برای هر موتورسیکلت · ارقام تاریخی مورد' : 'Estimated cost per motorcycle · Historical case figures'}</p>
          </header>
          <div className="scroll-area">
            <table>
              <thead>
                <tr>
                  <th scope="col">{fa ? 'برای هر موتورسیکلت' : 'Per motorcycle'}</th>
                  <th scope="col">{fa ? 'تریومف / NVT' : 'Triumph / NVT'}</th>
                  <th scope="col">{fa ? 'هوندا' : 'Honda'}</th>
                </tr>
              </thead>
              <tbody>
                {costRows.map((row) => (
                  <tr key={row.en} className={row.kind}>
                    <th scope="row">{fa ? row.fa : row.en}</th>
                    <td>{row.triumph}</td>
                    <td>{row.honda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="currency-note">
              {fa
                ? 'همهٔ مبالغ به دلار آمریکا (USD) هستند. بازه‌ها مطابق جدولِ درسیِ بازتولیدشده نمایش داده شده‌اند.'
                : 'All figures in US dollars (USD). Ranges are shown as reported in the reproduced lecture table.'}
            </div>
          </div>
        </div>
        <p className="source-note">
          <strong>{fa ? 'منبع:' : 'Source:'}</strong>{' '}
          “Measuring Honda’s Competitive Advantage” {fa ? 'اسلاید درسی، بازنشرشده در' : 'lecture slide, reproduced in'}{' '}
          <a href="https://www.scribd.com/document/796301268/modulo3-strategic-managment" target="_blank" rel="noopener noreferrer">
            Honda’s Strategic Success in Motorcycles
          </a>.{' '}
          {fa ? 'مورد مبنا نوشتهٔ Jan W. Rivkin است:' : 'The underlying case is Jan W. Rivkin,'}{' '}
          <em>British Motorcycle Industry at a Crossroads</em>,{' '}
          {fa
            ? 'مورد شمارهٔ 703031 مدرسهٔ کسب‌وکار هاروارد (۲۰۰۳؛ بازنگری ۲۰۰۸)،'
            : 'Harvard Business School case 703031 (2003; revised 2008),'}{' '}
          <a href="https://www.iveypublishing.ca/s/product/british-motorcycle-industry-at-a-crossroads/01t5c00000Cwb05AAB" target="_blank" rel="noopener noreferrer">
            {fa ? 'معرفی مورد' : 'case description'}
          </a>.{' '}
          {fa
            ? 'جدول در دسترس، بازتولیدِ یک اسلاید درسی است و جدولِ پیوستِ مورد اصلی نیست.'
            : 'The accessible table is a reproduced lecture slide, not the original case exhibit.'}
        </p>
      </section>

      <section className="mba-ca-formula" aria-labelledby="ca-formula-title">
        <div className="formula-card">
          <p className="eyebrow">{fa ? 'چارچوب راهبردی' : 'Strategy Framework'}</p>
          <h2 id="ca-formula-title">{fa ? 'سنجش مزیت رقابتی' : 'Quantifying Competitive Advantage'}</h2>
          <div
            className="formula-wrap"
            role="img"
            aria-label={fa
              ? 'مزیت رقابتی برابر است با تمایل به پرداخت برای هوندا منهای هزینهٔ هوندا، منهای تمایل به پرداخت برای تریومف منهای هزینهٔ تریومف.'
              : 'Competitive advantage equals Honda’s willingness to pay minus Honda’s cost, minus Triumph’s willingness to pay minus Triumph’s cost.'}
          >
            <div className="formula">
              <span className="ca-symbol">CA</span>
              <span>=</span>
              <span>(</span>
              <span className="group">WTP<sub>H</sub> − C<sub>H</sub></span>
              <span>) − (</span>
              <span className="group">WTP<sub>T</sub> − C<sub>T</sub></span>
              <span>)</span>
            </div>
          </div>
          <div className="definitions">
            <div className="definition">
              <strong>{fa ? 'WTP · تمایل به پرداخت' : 'WTP · Willingness to Pay'}</strong>
              <span>{fa ? 'بیشترین مبلغی که مشتری حاضر است برای محصول بپردازد.' : 'The maximum amount a customer is willing to pay for the product.'}</span>
            </div>
            <div className="definition">
              <strong>{fa ? 'C · هزینه' : 'C · Cost'}</strong>
              <span>{fa ? 'هزینهٔ تولید و رساندن محصول به مشتری.' : 'The cost of producing and delivering the product.'}</span>
            </div>
          </div>
          <p className="note">
            {fa
              ? 'H = هوندا · T = تریومف/NVT · CA = مزیت رقابتی هوندا در مقایسه با تریومف/NVT.'
              : 'H = Honda · T = Triumph/NVT · CA = Honda’s competitive advantage relative to Triumph/NVT.'}
          </p>
        </div>
      </section>

      <section className="mba-ca-calculation" aria-labelledby="mba-ca-calc-title">
        <div className="panel">
          <header className="heading">
            <p className="eyebrow">{fa ? 'هوندا در برابر تریومف / NVT' : 'Honda vs. Triumph / NVT'}</p>
            <h2 id="mba-ca-calc-title">{fa ? 'محاسبهٔ مزیت رقابتی' : 'Calculating Competitive Advantage'}</h2>
          </header>
          <div className="body">
            <div className="step">
              <p className="step-label">{fa ? '۱ · مزیت هزینه‌ای' : '1 · Cost advantage'}</p>
              <div className="equation" dir="ltr">
                C<sub>T</sub> − C<sub>H</sub> = $1,827 − ($1,354–$1,380)
                <br />= <strong>$447–$473 ≈ $460</strong>
              </div>
            </div>
            <div className="step">
              <p className="step-label">{fa ? '۲ · برتریِ برآوردشده در تمایل به پرداخت' : '2 · Estimated WTP advantage'}</p>
              <div className="equation" dir="ltr">
                WTP<sub>H</sub> − WTP<sub>T</sub> ≈ 12% × $2,112
                <br />= $253.44 ≈ <strong>$250</strong>
              </div>
            </div>
            <div className="step">
              <p className="step-label">{fa ? '۳ · به‌کارگیری فرمول مزیت رقابتی' : '3 · Apply the competitive advantage formula'}</p>
              <div className="equation" dir="ltr">
                CA = (WTP<sub>H</sub> − C<sub>H</sub>) − (WTP<sub>T</sub> − C<sub>T</sub>)
                <br />CA = (WTP<sub>H</sub> − WTP<sub>T</sub>) + (C<sub>T</sub> − C<sub>H</sub>)
                <br />CA ≈ $250 + $460 = <strong>{fa ? '$710 برای هر موتورسیکلت' : '$710 per motorcycle'}</strong>
              </div>
            </div>
            <div className="result">
              <div className="result-label">
                {fa ? 'کل مزیت رقابتی برآوردشده' : 'Estimated total competitive advantage'}
                <br />{fa ? 'برای هر موتورسیکلت' : 'per motorcycle'}
              </div>
              <div className="result-number" dir="ltr">≈ $710</div>
            </div>
            <p className="note">
              <strong>{fa ? 'تفسیر:' : 'Interpretation:'}</strong>{' '}
              {fa
                ? 'ارقام هزینه نشان می‌دهند مزیت هزینه‌ای بین ۴۴۷ تا ۴۷۳ دلار، یا حدود ۴۶۰ دلار است. برتری در تمایل به پرداخت، برآوردی است که از تخفیف قیمتی حدود ۱۲درصدی NVT در سالِ ثبات سهم بازارش به دست آمده و اندازه‌گیری مستقیم نیست. با استفاده از ارقام گرد‌شدهٔ درس، مزیت کل حدود ۷۱۰ دلار به دست می‌آید.'
                : 'The cost figures imply a cost advantage of $447–$473, or about $460. The WTP advantage is an estimate inferred from NVT’s approximately 12% price discount in the year its market share held steady; it is not a direct measurement. Using the rounded estimates from the lecture gives a total advantage of about $710.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
