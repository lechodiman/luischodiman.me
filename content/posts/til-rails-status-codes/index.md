---
template: 'post'
title: 'TIL: Rails status codes'
slug: 'til-rails-status-codes'
draft: false
date: '2020-11-03'
description:
  'Today I Learned: Puedes obtener los status codes de rails con la consola'
category: 'til'
tags:
  - 'til'
  - 'ruby'
  - 'rails'
socialImage: './images/banner.jpg'
socialImageCredit:
  'Foto por [Alexander Sinn](https://unsplash.com/photos/KgLtFCgfC28)'
---

Siempre olvido qué código está asignado a qué simbolo en rails. ¿Es
`:unprocessable_entity` o `:un_procesable_entity` ? ¿se escribe con una s o con
dos? 🤣

Acá están los _status codes_ y sus respectivos símbolos:
([fuente](https://gist.github.com/mlanett/a31c340b132ddefa9cca))

```json
HTTP status code symbols for Rails

Thanks to Cody Fauser for this list of HTTP responce codes and their Ruby on Rails symbol mappings.

Status Code Symbol
1xx Informational
100 :continue
101 :switching_protocols
102 :processing

2xx Success
200 :ok
201 :created
202 :accepted
203 :non_authoritative_information
204 :no_content
205 :reset_content
206 :partial_content
207 :multi_status
226 :im_used

3xx Redirection
300 :multiple_choices
301 :moved_permanently
302 :found
303 :see_other
304 :not_modified
305 :use_proxy
307 :temporary_redirect

4xx Client Error
400 :bad_request
401 :unauthorized
402 :payment_required
403 :forbidden
404 :not_found
405 :method_not_allowed
406 :not_acceptable
407 :proxy_authentication_required
408 :request_timeout
409 :conflict
410 :gone
411 :length_required
412 :precondition_failed
413 :request_entity_too_large
414 :request_uri_too_long
415 :unsupported_media_type
416 :requested_range_not_satisfiable
417 :expectation_failed
422 :unprocessable_entity
423 :locked
424 :failed_dependency
426 :upgrade_required

5xx Server Error
500 :internal_server_error
501 :not_implemented
502 :bad_gateway
503 :service_unavailable
504 :gateway_timeout
505 :http_version_not_supported
507 :insufficient_storage
510 :not_extended
```

También se pueden obtener a través de la `rails console`

```ruby
rails c
Rack::Utils::HTTP_STATUS_CODES
```

El output es algo como:

```ruby
 100=>"Continue",
 101=>"Switching Protocols",
 102=>"Processing",
 200=>"OK",
 201=>"Created",
 202=>"Accepted",
 203=>"Non-Authoritative Information",
 204=>"No Content",
 205=>"Reset Content",
 206=>"Partial Content",
 207=>"Multi-Status",
 226=>"IM Used",
 300=>"Multiple Choices",
 301=>"Moved Permanently",
 302=>"Found",
 303=>"See Other",
 304=>"Not Modified",
 305=>"Use Proxy",
 306=>"Reserved",
 307=>"Temporary Redirect",
 400=>"Bad Request",
 401=>"Unauthorized",
 402=>"Payment Required",
 403=>"Forbidden",
 404=>"Not Found",
 405=>"Method Not Allowed",
 406=>"Not Acceptable",
 407=>"Proxy Authentication Required",
 408=>"Request Timeout",
 409=>"Conflict",
 410=>"Gone",
 411=>"Length Required",
 412=>"Precondition Failed",
 413=>"Request Entity Too Large",
 414=>"Request-URI Too Long",
 415=>"Unsupported Media Type",
 416=>"Requested Range Not Satisfiable",
 417=>"Expectation Failed",
 418=>"I'm a Teapot",
 422=>"Unprocessable Entity",
 423=>"Locked",
 424=>"Failed Dependency",
 426=>"Upgrade Required",
 500=>"Internal Server Error",
 501=>"Not Implemented",
 502=>"Bad Gateway",
 503=>"Service Unavailable",
 504=>"Gateway Timeout",
 505=>"HTTP Version Not Supported",
 506=>"Variant Also Negotiates",
 507=>"Insufficient Storage",
 510=>"Not Extended"}
```
