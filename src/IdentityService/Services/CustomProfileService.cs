using System;
using System.Security.Claims;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services;

public class CustomProfileService : IProfileService
{
    // UserManager<ApplicationUser> is used to get the user details
    private readonly UserManager<ApplicationUser> _userManager;
    // Constructor to inject the UserManager<ApplicationUser>
    public CustomProfileService(UserManager<ApplicationUser> userManager)   
    {
        _userManager = userManager;
    }
    /// <summary>
    /// Retrieves the profile data for the specified context.
    /// </summary>
    /// <param name="context">The context containing the subject for which to retrieve profile data.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await _userManager.GetUserAsync(context.Subject);
        var existingClaims = await _userManager.GetClaimsAsync(user);

        var claims = new List<Claim>
        {
            new Claim("username", user.UserName)
        };

        context.IssuedClaims.AddRange(claims);
        context.IssuedClaims.Add(existingClaims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name));
    }


    public Task IsActiveAsync(IsActiveContext context)
    {
        return Task.CompletedTask;
    }
}
