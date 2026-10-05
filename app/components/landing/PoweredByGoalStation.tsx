export function PoweredByGoalStation() {
  return (
    <div
      className="footer-powered-by-goalstation"
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%', marginTop: 28, textAlign: 'center'}}
    >
      <span style={{fontSize: 11, lineHeight: 1.4, letterSpacing: '0.12em', textTransform: 'uppercase'}}>
        Powered by
      </span>
      <img
        src="https://cdn.shopify.com/s/files/1/0942/1380/0238/files/GS-Goal-Station.png?v=1776243848"
        alt="Goal Station"
        width={702}
        height={59}
        loading="lazy"
        style={{display: 'block', width: 240, maxWidth: '80%', height: 'auto'}}
      />
    </div>
  );
}
