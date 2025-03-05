using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityService.Pages.Account.Register
{
    [SecurityHeaders]  // Add security headers
    [AllowAnonymous] // Allow anonymous access
    public class Index : PageModel
    {   
        public void OnGet()
        {
        }
    }
}
