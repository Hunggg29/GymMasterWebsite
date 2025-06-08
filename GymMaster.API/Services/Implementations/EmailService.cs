using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using GymMaster.API.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace GymMaster.API.Services.Implementations
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
        private readonly string _fromEmail;
        private readonly string _toEmail;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
            _smtpServer = _configuration["EmailSettings:SmtpServer"];
            _smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"]);
            _smtpUsername = _configuration["EmailSettings:SmtpUsername"];
            _smtpPassword = _configuration["EmailSettings:SmtpPassword"];
            _fromEmail = _configuration["EmailSettings:FromEmail"];
            _toEmail = _configuration["EmailSettings:ToEmail"];
        }

        public async Task SendEquipmentMaintenanceEmailAsync(string equipmentName, string equipmentId)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("GymMaster System", _fromEmail));
            email.To.Add(new MailboxAddress("Maintenance Team", _toEmail));
            email.Subject = $"Equipment Maintenance Required: {equipmentName}";

            var builder = new BodyBuilder();
            builder.HtmlBody = $@"
                <h2>Equipment Maintenance Required</h2>
                <p>Dear Maintenance Team,</p>
                <p>This is to inform you that the following equipment requires maintenance:</p>
                <ul>
                    <li><strong>Equipment Name:</strong> {equipmentName}</li>
                    <li><strong>Equipment ID:</strong> {equipmentId}</li>
                    <li><strong>Status:</strong> Broken</li>
                    <li><strong>Reported Time:</strong> {DateTime.UtcNow}</li>
                </ul>
                <p>Please take necessary action to repair or replace this equipment.</p>
                <p>Best regards,<br>GymMaster ITSS</p>";

            email.Body = builder.ToMessageBody();

            using (var smtp = new SmtpClient())
            {
                await smtp.ConnectAsync(_smtpServer, _smtpPort, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(_smtpUsername, _smtpPassword);
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }
        }
    }
} 