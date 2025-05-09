---
layout: page
title: Contact
permalink: /contact
comments: false
---

<div class="row justify-content-between">
<div class="col-md-8 pr-5">

<h2>Get in Touch</h2>

<p>Thank you for your interest in connecting with me. Whether you're looking for AI consulting services, interested in collaboration opportunities, or have questions about the content on this site, I'm here to help.</p>

<h4>How I Can Help</h4>
<ul>
    <li><strong>AI Consulting</strong> - Strategic guidance for organizations looking to implement AI solutions</li>
    <li><strong>Technical Projects</strong> - Machine learning development and implementation</li>
    <li><strong>Training & Workshops</strong> - Customized AI training for teams and organizations</li>
    <li><strong>Speaking Engagements</strong> - Conference presentations and educational talks</li>
    <li><strong>Content Collaboration</strong> - Technical writing and educational material development</li>
</ul>

<h4>Contact Form</h4>
<p>Please fill out the form below, and I'll get back to you as soon as possible.</p>

<form id="contact-form" action="#" method="POST">
    <div class="form-group">
        <label for="contact-name">Name</label>
        <input type="text" class="form-control" id="contact-name" name="name" required>
    </div>
    <div class="form-group">
        <label for="contact-email">Email</label>
        <input type="email" class="form-control" id="contact-email" name="email" required>
    </div>
    <div class="form-group">
        <label for="contact-subject">Subject</label>
        <input type="text" class="form-control" id="contact-subject" name="subject" required>
    </div>
    <div class="form-group">
        <label for="contact-message">Message</label>
        <textarea class="form-control" id="contact-message" name="message" rows="6" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Send Message</button>
</form>
<div class="contact-message mt-3"></div>

</div>

<div class="col-md-4">
<div class="sticky-top sticky-top-80">
<h5>Contact Information</h5>

<p><strong>Email:</strong><br> 
rajuvenkatesh188@gmail.com</p>

<p><strong>Location:</strong><br>
Bangalore, India</p>

<h5>Connect on Social Media</h5>
<ul class="list-unstyled">
    <li><a href="#"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
    <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
    <li><a href="#"><i class="fab fa-github"></i> GitHub</a></li>
</ul>

<h5>Office Hours</h5>
<p>
Monday - Friday<br>
9:00 AM - 5:00 PM IST
</p>
</div>
</div>
</div>

<script>
    // This would normally be handled by a backend service
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        document.querySelector('.contact-message').innerHTML = '<div class="alert alert-success">Thank you for your message! I will get back to you as soon as possible.</div>';
        this.reset();
    });
</script> 