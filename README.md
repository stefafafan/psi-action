<a href="https://github.com/stefafafan/psi-action/actions"><img alt="psi-action status" src="https://github.com/stefafafan/psi-action/workflows/build-test/badge.svg"></a>

# psi-action
psi-action is a GitHub Action that outputs [PageSpeed Insights](https://pagespeed.web.dev/) values for the next steps of a workflow. This action is similar to [JakePartusch/psi-action](https://github.com/JakePartusch/psi-action), but different in that this actually outputs the values for further use in the workflow.

## Inputs
- `url`: The URL to fetch PageSpeed Insights results.
- `key`: API Key for the PageSpeed Insights API.
- `strategy`: Strategy to fetch PageSpeed Insights results. "mobile" or "desktop".

## Outputs
- `score`: Overall score of the url. Maximum is 100.
- `first-contentful-paint`: First Contentful Paint (FCP) in milliseconds.
- `first-input-delay`: First Input Delay (FID) in milliseconds.
- `cumulative-layout-shift`: Cumulative Layout Shift (CLS) score.
- `largest-contentful-paint`: Largest Contentful Paint (LCP) in milliseconds.
- `speed-index`: Speed Index score. Maximum is 100.
- `time-to-interactive`: Time to Interactive score. Maximum is 100.
- `total-blocking-time`: Total Blocking Time score. Maximum is 100.

## Example Usage
```yaml
    - id: psi
      uses: stefafafan/psi-action@v1
      with:
        url: 'https://example.com/'
        key: ${{ secrets.API_KEY }}
        strategy: 'mobile'
    - name: echo score
      run: echo "Score: ${{ steps.psi.outputs.score }}"
```

## Contributing

See the [Contribution Guide](https://github.com/stefafafan/psi-action/blob/main/CONTRIBUTING.md).

## Author

stefafafan ([GitHub](https://github.com/stefafafan), [Twitter](https://twitter.com/stefafafan))
